import { createStore } from "redux";
import action_1 from "./actionCreator/action_1";
import initialState from "./initialState";
import mapStateToProps from "./mapStateToProps"; 
import mapDispatchToProps from "./mapDispatchToProps";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>, 
document.getElementById('root'));

function reducer(state, action ) {
    switch(action.type) {
        case ACTION_1: return { value: action.value_1 };
        case ACTION_2: return { value: action.value_2 };
        
        default: return state;
    }
}

store.dispatch(action_1("Some value"));
store.getState().value_1;


const COMPONENT_1_W = connect(mapStateToProps("Component_1"), mapDispatchToProps("Component_1"))(Component_1);
export default store;