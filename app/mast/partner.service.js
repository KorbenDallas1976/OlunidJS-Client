"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
var PartnerService = (function () {
    function PartnerService(http) {
        this.http = http;
        this.partnersUrl = 'http://localhost:3333/api/partners'; // URL to web API
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    PartnerService.prototype.getPartners = function () {
        return this.http.get(this.partnersUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    PartnerService.prototype.getPartner = function (id) {
        /*
            return this.http.get(this.partnersUrl + '/' + id)
                       .toPromise()
                       .then(response => response.json().data as Partner)
                       .catch(this.handleError);
                       */
        return this.getPartners()
            .then(function (partners) { return partners.find(function (partner) { return partner.id === id; }); });
    };
    PartnerService.prototype.updatePartner = function (partner) {
        var url = this.partnersUrl + "/" + partner.id;
        return this.http
            .put(url, JSON.stringify(partner), { headers: this.headers })
            .toPromise()
            .then(function () { return partner; })
            .catch(this.handleError);
    };
    PartnerService.prototype.createPartner = function (partner) {
        return this.http
            .post(this.partnersUrl, JSON.stringify(partner), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PartnerService.prototype.deletePartner = function (id) {
        var url = this.partnersUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PartnerService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = error.message || error.statusText || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    ;
    PartnerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PartnerService);
    return PartnerService;
}());
exports.PartnerService = PartnerService;
//# sourceMappingURL=partner.service.js.map