import sys
sys.path.insert(0, 'C:/Users/K1/AppData/Local/hermes/hermes-agent/venv/Lib/site-packages')
from lunar_python import Lunar, Solar
import json

year, month, day, hour, minute, gender = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6])

solar = Solar.fromYmdHms(year, month, day, hour, minute, 0)
lunar = solar.getLunar()
bc = lunar.getEightChar()

year_p = bc.getYear()
month_p = bc.getMonth()
day_p = bc.getDay()
time_p = bc.getTime()

result = {
    "solar": f"{year}年{month}月{day}日 {hour}:{minute:02d}",
    "lunar": f"{lunar.getYearInChinese()}年{lunar.getMonthInChinese()}月{lunar.getDayInChinese()}日",
    "shengxiao": lunar.getYearShengXiao(),
    "pillars": {
        "year": {"gan": year_p[0], "zhi": year_p[1], "nayin": bc.getYearNaYin()},
        "month": {"gan": month_p[0], "zhi": month_p[1], "nayin": bc.getMonthNaYin()},
        "day": {"gan": day_p[0], "zhi": day_p[1], "nayin": bc.getDayNaYin()},
        "time": {"gan": time_p[0], "zhi": time_p[1], "nayin": bc.getTimeNaYin()},
    },
    "shishen": {
        "year_gan": bc.getYearShiShenGan(),
        "month_gan": bc.getMonthShiShenGan(),
        "day_gan": "日主",
        "time_gan": bc.getTimeShiShenGan(),
    },
    "dayun": []
}

yun = bc.getYun(gender)
dayun_list = yun.getDaYun()
for d in dayun_list[:8]:
    result["dayun"].append({
        "start_age": d.getStartAge(),
        "end_age": d.getEndAge(),
        "ganzhi": d.getGanZhi()
    })

print(json.dumps(result, ensure_ascii=False))
