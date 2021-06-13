// Convert Solar date to Gregorian
function toGregorian(solarDate, dateFormat = null) {
    if( typeof solarDate != 'string')
        throw new Error('solarDate is required to be string.')
    const dateMatch = solarDate.match(/^(\d{4})([-\/]{1})(\d{2})([-\/]{1})(\d{2})$/)
    if (!dateMatch) 
        throw new Error('Invalid date format.')
    if (dateFormat && (typeof dateFormat != 'string' || !dateFormat.match(/^([y]{4})([ -\/]{1})([M]{2,4})([ -\/]{1})([d]{2})$/))){
        throw new Error('Invalid date format.\nSupported formats are: yyyy-MM-dd, yyyy-MMM-dd, yyyy-MMMM-dd, yyyy/MM/dd, yyyy/MMM/dd, yyyy/MMMM/dd')
    }     
    var year = parseInt(dateMatch[1]), month = parseInt(dateMatch[3]), day = parseInt(dateMatch[5])

    if(year < 1 || month < 1 || day < 1 || month > 12 || day > 31 || (month > 6 && day > 30))
        throw new Error('Invalid Solar date: ' + solarDate)

    var d4 = (year + 1) % 4
    if (month < 7) 
        var jDay = ((month - 1) * 31) + day
    else
        var jDay = ((month - 7) * 30) + day + 186
    var d33 = parseInt((((year - 55) % 132) * .0305)+'')
    var a = (d33 != 3 && d4 <= d33) ? 287 :  286
    if ((d33 == 1 || d33 == 2) && (d33 == d4 || d4 == 1))
        var b = 78
    else 
        var b = (d33 == 3 && d4 == 0) ? 80 : 79
    if (((year - 19) / 63) == 20)
        a -= 1, b += 1
    if (jDay <= a)
        var gYear = year + 621, gDay = jDay + b
    else
        var gYear = year + 622, gDay = jDay - a
    var arr = [0, 31, gYear % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var gMonth = 0
    for(gMonth = 0; gMonth < arr.length; gMonth++){
        if (gDay <= arr[gMonth])
            break
        gDay -= arr[gMonth]
    }
    var zMonth = gMonth > 9 ? gMonth : '0' + gMonth;
    var zDay = gDay > 9 ? gDay : '0' + gDay 
    if (dateFormat) {
        var sMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var lMonthNames = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'Septemper', 'October', 'November', 'December']
        dateFormat = dateFormat.replace('yyyy', gYear).replace('dd', zDay).replace('MMMM', lMonthNames[gMonth-1]).replace('MMM', sMonthNames[gMonth-1]).replace('MM', zMonth)
    } else {
        dateFormat = gYear + '-' + zMonth + '-' + zDay
    }
    return dateFormat
}

// Convert Gregorian date to Solar date
function toSolar(gregorianDate, dateFormat = null, isDari = true) {
    if( typeof gregorianDate != 'string')
        throw new Error('gregorianDate is required to be string.')
    const dateMatch = gregorianDate.match(/^(\d{4})([-\/]{1})(\d{2})([-\/]{1})(\d{2})$/)
    if (!dateMatch || new Date(gregorianDate) == 'Invalid Date'){
        throw new Error('Invalid Gregorian date: ' + gregorianDate)
    }
    if (dateFormat && (typeof dateFormat != 'string' || !dateFormat.match(/^([y]{4})([ -\/]{1})([M]{2,3})([ -\/]{1})([d]{2})$/))){
        throw new Error('Invalid date format.\nSupported formats are: yyyy-MM-dd, yyyy-MMM-dd, yyyy/MM/dd, yyyy/MMM/dd')
    } 
    var year = parseInt(dateMatch[1]), month = parseInt(dateMatch[3]), day = parseInt(dateMatch[5])
    var d4 = year % 4
    var gDays = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    var days = gDays[month] + day
    if (d4 == 0 && month > 2)
        days += 1
    var d33 = parseInt((((year - 16) % 132) * .0305) + '')
    var a = (d33 == 3 || d33 < (d4 - 1) || d4 == 0) ? 286 : 287, b = 0
    if ((d33 == 1 || d33 == 2) && (d33 == d4 || d4 == 1))
        b = 78
    else
        b = (d33 == 3 && d4 == 0) ? 80 : 79
    if (parseInt(((year - 10) / 63)+'') == 30)
        a -= 1, b += 1
    if (days > b)
        sYear = year - 621, jDay = days - b
    else
        sYear = year - 622, jDay = days + a
    if (jDay < 187)
        sMonth = parseInt(((jDay - 1) / 31) + ''), sDay = jDay - (31 * sMonth), sMonth += 1
    else
        sMonth = parseInt(((jDay - 187) / 30) + ''), sDay = jDay - 186 - (sMonth * 30), sMonth += 7

    var zMonth = sMonth > 9 ? sMonth : '0' + sMonth;
    var zDay = sDay > 9 ? sDay : '0' + sDay 
    if (dateFormat) { 
        var monthNames = isDari ? ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'] 
            : ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
        dateFormat = dateFormat.replace('yyyy', '\u200E'+sYear).replace('dd', '\u200E'+zDay).replace('MMM', monthNames[sMonth-1]).replace('MM', zMonth)
    } else {
        dateFormat = sYear + '-' + zMonth + '-' + zDay
    }
    return dateFormat
}

module.exports.toGregorian = toGregorian
module.exports.toSolar = toSolar    