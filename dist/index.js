'use strict';

var _Redux = require('Redux');

var _Redux2 = _interopRequireDefault(_Redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* important concepts of redux
* Action Creator
* Action
* Dispatcher
* Reducer
* State
*/

// action Creator
var createPolicy = function createPolicy(name, amount) {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name: name, amount: amount
        }
    };
};

var createClaim = function createClaim(name, moneyToCollect) {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name, moneyToCollect: moneyToCollect
        }
    };
};

var deleteClaim = function deleteClaim(name) {
    return {
        type: 'DELETE_CLAIM',
        payload: {
            name: name
        }
    };
};

// reducer functions
var claimsHistory = function claimsHistory(listOfClaims, action) {
    if (action.type === 'CREATE_CLAIM') {
        return [].concat(_toConsumableArray(listOfClaims), [action.payload.name]);
    }
    return listOfClaims;
};

var accounting = function accounting() {
    var bagOfMoney = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    var action = arguments[1];

    if (action.type === 'CREATE_CLAIM') {
        bagOfMoney -= action.payload.moneyToCollect;
    } else if (action.type === 'CREATE_POLICY') {
        bagOfMoney += action.payload.amount;
    } else {
        // do nothing
    }
    return bagOfMoney;
};

var policies = function policies(policyList, action) {
    if (action.type === 'CREATE_POLICY') {
        return [].concat(_toConsumableArray(policyList), [action.payload.name]);
    } else if (action.type === 'DELETE_POLICY') {
        return policyList.filter(function (policy) {
            return policy !== action.payload.name;
        });
    } else {
        // do nothing
    }
    return policyList;
};

//create redux
var createStore = _Redux2.default.createStore,
    combineReducers = _Redux2.default.combineReducers;


var departmentList = combineReducers({
    claimsHistory: claimsHistory,
    policies: policies,
    accounting: accounting
});

var store = createStore(departmentList);

console.log("test");
console.log(store);