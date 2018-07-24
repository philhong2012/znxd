/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://gvxbkhpr.qcloud.la';
//var myHost = 'https://bewicode.com/selweb';
//var myHost = 'http://172.20.10.2:9001';
//var myHost = 'http://192.168.1.104:9001';
var myHost = 'http://192.168.17.119:9001';
var config = {

    qqMapKey: 'XUEBZ-DY2CP-FMTDJ-V5C2R-BY32K-NIBTX',

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        myHost,


        saveDisplayInfo: `${myHost}/display/saveDisplay`,


        helloWorld: `${myHost}/api/helloWorld`,

        loginUrl2:`${myHost}/user/login`,

        nearbyStores: `${myHost}/drugstore/nearBy?debug=a`,

        getStoreInfo: `${myHost}/drugstore/store`,

        saveStoreInfo: `${myHost}/drugstore/saveStoreInfo`,

        saveInstoreInfo: `${myHost}/instore/saveInstore`,

        todayInstoreInfo: `${myHost}/instore/todayInstoreInfo`,

        uploadFile: `${myHost}/file/upload`,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    }
};

module.exports = config;
