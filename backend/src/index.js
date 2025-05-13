"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var yoo_checkout_1 = require("@a2seven/yoo-checkout");
var database = {};
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ---------------------------------
var YouKassa = new yoo_checkout_1.YooCheckout({
    shopId: '1082575',
    secretKey: 'test_eoCC7M0gupEbxLPkH2JEr6FyhccP_T_LatFk-0hxvgc'
});
app.post('/api/payment', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createPayload, payment, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createPayload = {
                    amount: {
                        value: req.body.value,
                        currency: 'RUB'
                    },
                    payment_method_data: {
                        type: 'bank_card'
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: 'https://secondly-worthy-shrimp.cloudpub.ru'
                    },
                    metadata: {
                        orderId: req.body.orderId,
                        userId: req.body.userId,
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, YouKassa.createPayment(createPayload, 
                    // Не делать так в проде
                    Date.now().toString())];
            case 2:
                payment = _a.sent();
                database[payment.id] = payment;
                res.json({ payment: payment });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(400).json({ error: 'error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/payment/notifications', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req.body);
        database[req.body.id] = req.body;
        res.json({ status: "OK" });
        return [2 /*return*/];
    });
}); });
app.listen(PORT, function () {
    console.log("Server running at http://localhost:".concat(PORT));
});
