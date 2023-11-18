module.exports = {
    protocol: 'http://',
    host: 'localhost:',
    port: 8088,
    api_prefix: '/cis_server_war_exploded/',
    getUrl: function () {
        return this.protocol + this.host + this.port + this.api_prefix;
    }
}