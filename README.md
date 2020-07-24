# Frontend

Created on Jul 8th, 2020.

### message 

- 全局的*Message*放在```App.js```中，其余组件只需要用```PubSub```发送一个```SET_MESSAGE```信号（在```constant.js```中可以直接引入）以及需要发送的内容即可发送一条*Message*

- Message 类型主要四种：```error, info, success, warning```

- 使用方式：

     ```
     PubSub.publish(MsgType.SET_MESSAGE, {
     	open: true, text: data.msg, type: 'warning'});
     ```



### redux

- *redux*配置在*redux*文件夹下，*userReducer* 和 *tokenReducer* 分别存储管理全局的 *user* 和 *token*变量，

- 使用方式： 加入```mapStateToProps, mapDispatchToProps``` 函数， 并用```connect```连接这函数和组件，对应的函数和值都在组件的 ```props``` 中可以直接调用。

  ```
  import {setToken, setUser} from "../redux/actions";
  import { connect } from 'react-redux'
  ...
  
  function mapStateToProps(state) {
      return {
          value: state
      }
  }
  
  function mapDispatchToProps(dispatch) {
      return {
          onSetUser: () => {
              let user = {
                  name: 'bess',
                  userType: 0
              }
              dispatch(setUser(user));
              dispatch(setToken('zyw token'));
          }
      }
  }
  
  class TEST{
  ....
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(TEST)
  ```

