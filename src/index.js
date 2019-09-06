import Redux from 'Redux';

/*App requirement
    Insurance company that handles claims and policies
*/

/* important concepts of redux
* Action Creator
* Action
* Dispatcher
* Reducer
* State
*/

// action Creator
const createPolicy = (name, amount) => {
    return {
        type : 'CREATE_POLICY',
        payload : {
            name, amount
        }
    }
}

const createClaim = (name, moneyToCollect) => {
    return {
        type : 'CREATE_CLAIM',
        payload : {
            name, moneyToCollect
        }
    }
}

const deleteClaim = (name) => {
    return {
        type : 'DELETE_CLAIM',
        payload : {
            name
        }
    }
}


// reducer functions
const claimsHistory = (listOfClaims = [], action) => {
    if( action.type === 'CREATE_CLAIM' ){
        return [ ...listOfClaims ,  action.payload.name ]
    }
    return listOfClaims;
}

const accounting = (bagOfMoney = 100, action) => {
    if( action.type === 'CREATE_CLAIM' ){
        bagOfMoney -= action.payload.moneyToCollect;
    }else if ( action.type ===  'CREATE_POLICY' ){
        bagOfMoney += action.payload.amount
    }else{
        // do nothing
    }
    return bagOfMoney;
}

const policies = (policyList = [], action) => {
    if( action.type === 'CREATE_POLICY' ){
        return [ ...policyList , action.payload.name ];
    }else if ( action.type === 'DELETE_POLICY' ){
        return policyList.filter((policy) => { return policy !== action.payload.name });
    }else{
        // do nothing
    }
    return policyList;
}


//create redux
const { createStore, combineReducers } = Redux;

const departmentList = combineReducers({
    claims : claimsHistory,
    policies : policies,
    accounting : accounting
});

const store = createStore(departmentList);

// create an action
// const action = createPolicy('Karthik' , 30);
// dispatch action
store.dispatch(createPolicy('Karthik' , 30));
store.dispatch(createPolicy('Raj' , 10));
store.dispatch(createPolicy('Aravind' , 20));


console.log(store.getState())
