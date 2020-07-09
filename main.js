var strSearch = rawInput("输入关键词搜索下载，不输入就全部下载。下载后进入sd卡/111111/目录里找");








// 根据头尾字符串，切出中间的字符串数组
var GetStrByStartAndEnd = function(strText, strStart, strEnd) {

    let arrText = [];
    let arrTextTemp = strText.split(strStart)
    for (let ii = 0; ii < arrTextTemp.length; ii++) {
        let oneStr = arrTextTemp[ii];
        if (oneStr.indexOf(strEnd) != -1) {

            let picUrl = oneStr.split(strEnd)[0];
            arrText.push(picUrl);
        }
    }

    return arrText;

}



let nwebIndex = 3279; //初识网址
let nMaxWebNum = 2000; //需要扒多少网页填多少





for (let i = 0; i < nMaxWebNum; i++) {
    try {
        let strUrl = "https://xn--wcsr8yy8y.xyz/content_" +
            (nwebIndex - i) + ".html";

        var jsdata = http.postJson(strUrl, {});
        var strText = jsdata.body.string();

        //console.error("|||" + strText);

        //切出标题文本
        let strTitle = strText.split(".com")[0];
        strTitle = strTitle.split("<title>")[1];

        if (strSearch && strSearch.length > 0) {
            if (strTitle.indexOf(strSearch) == -1) {
                console.log(i + "==没有" + strSearch + ",跳过==" + strTitle);
                continue;
            } else {
                console.log("下载这个=", i, strTitle)
            }

        } else {
            console.log("下载这个=", i, strTitle)
        }

        let bbb = files.createWithDirs("/sdcard/111111/" + strTitle + "/");
        var arrAllUrl = GetStrByStartAndEnd(strText, 'src=\"', '" onerror=');
        for (let one in arrAllUrl) {

            let picUrl = arrAllUrl[one];
            let img = images.load(picUrl);
            images.save(img, "/sdcard/111111/" + strTitle + "/" + one + ".png");

        }
    } catch (error) {
        console.error("下载失败" + error)
    }
}


//console.error("arr===", arrText)