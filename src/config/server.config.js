module.exports = {
    protocol: 'http://',
    host: 'localhost:',
    port: 8081,
    api_prefix: '/CIS_Server_war/',
    getUrl: function () {
        return this.protocol + this.host + this.port + this.api_prefix;
    }
}