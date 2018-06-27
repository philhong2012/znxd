/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://gvxbkhpr.qcloud.la';
var myHost = 'http://192.168.17.192:9001';

//var myHost = 'http://192.168.1.104:9001';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        myHost,

        helloWorld: `${myHost}/api/helloWorld`,

        loginUrl2:`${myHost}/user/login?debug`,

        nearbyStores: `${myHost}/drugstore/nearBy?debug=a`,

        getStoreInfo: `${myHost}/drugstore/store`,

        saveInstoreInfo: `${myHost}/instore/saveInstore`,

        saveDisplayInfo: `${myHost}/display/saveDisplay`,

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
