import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'


export default class FbLogin extends Component {

    componentWillMount(){
        this.setState ({
            isSdkLoaded: false,
            isProcessing: false,
            userImage: (this.props.fbData && this.props.fbData.picture.data.url) ? this.props.fbData.picture.data.url : false,
            userName: (this.props.fbData && this.props.fbData.name) ? this.props.fbData.name : false
        })
    }
    componentWillUpdate(nextProps){
        if (nextProps.fbData && this.props.fbData != nextProps.fbData){
            this.setState({
                ...this.state,
                userImage: nextProps.fbData.picture.data.url,
                userName: nextProps.fbData.name
            })
        }
    }

    componentDidMount() {
        if (document.getElementById('facebook-jssdk')) {
            this.sdkLoaded();
            return;
        }
        this.loadSdkAsynchronously();
        if (!this.props.fbData && this.props.fbId && this.props.fbId !='0'){
            this.setFbAsyncInit();
        }

    }

    sdkLoaded() {
        this.setState({ isSdkLoaded: true })
    }

    loadSdkAsynchronously() {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://connect.facebook.net/ru_RU/sdk.js';
        el.async = true;
        el.id = 'facebook-jssdk';
        document.getElementsByTagName('head')[0].appendChild(el);

        if (document.getElementById('facebook-jssdk')) {
            this.sdkLoaded();
            return;
        }
    }

    setFbAsyncInit() {
        const { apiId } = this.props;
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: apiId,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            })
            this.setState({ isSdkLoaded: true });
            this.getUserInfoMation(this.props.fbId)
        };
    }

    getUserInfoMation(){
        const socialAutorization = this.props.socialAutorization
        window.FB.getLoginStatus(function() {
            window.FB.api('/me', { locale: 'ru_RU', fields: 'name,email,picture.width(150).height(150)' }, (me) => {
              socialAutorization(me, 'fbData')
            });
        });

    }



    checkLoginState = (response) => {
        console.log(response);
        const socialAutorization = this.props.socialAutorization

        this.setState({ isProcessing: false });
        window.FB.api('/me', { locale: 'ru_RU', fields: 'name,email,picture.width(150).height(150)' }, (me) => {
          console.log(me);
          socialAutorization(me, 'fbData')
        });
    };

    click = () => {
        const { apiId } = this.props
        window.FB.init({
            appId: apiId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.11'
        })
        this.setState({ isProcessing: true });
        window.FB.login(this.checkLoginState, {scope: 'email,public_profile', return_scopes: true});
    };

    render() {
        let fbWrapAfterAuth
        if (this.state.userImage && this.state.userName && this.props.fbData){
            fbWrapAfterAuth = (
                <div className='vk-wrap'>
                    <span>{this.state.userName}</span>
                    <img src={this.state.userImage} />
                </div>
            )
        }else{
            fbWrapAfterAuth = (
                <div className='non-auth'>
                    <RaisedButton
                        label='Вход через в FB'
                        primary={true}
                        onClick={this.click}
                    />
                </div>
            )
        }

        return fbWrapAfterAuth
    }
}
