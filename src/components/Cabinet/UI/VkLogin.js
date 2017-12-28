import React, { Component } from 'react'
import styles from './vk.css';


export default class vkLogin extends Component {

    componentWillMount(){
        this.setState ({
            isSdkLoaded: false,
            isProcessing: false,
            userImage: (this.props.vkData && this.props.vkData.photo_400_orig) ? this.props.vkData.photo_400_orig : false,
            userName: (this.props.vkData && this.props.vkData.first_name) ? this.props.vkData.first_name : false
        })
    }
    componentWillUpdate(nextProps){
        if (nextProps.vkData && this.props.vkData != nextProps.vkData){
            this.setState({
                ...this.state,
                userImage: nextProps.vkData.photo_400_orig,
                userName: nextProps.vkData.first_name
            })
        }
    }

    componentDidMount() {
        if (document.getElementById('vk-jssdk')) {
            this.sdkLoaded();
            return;
        }
        if (this.props.vkId){
            this.setFbAsyncInit();

        }
        this.loadSdkAsynchronously();
    }

    setFbAsyncInit() {
        const { apiId } = this.props;
        window.vkAsyncInit = () => {
            window.VK.init({ apiId });
            this.setState({ isSdkLoaded: true });
            window.VK.Auth.login(this.checkLoginState);
        };
    }

    sdkLoaded() {
        this.setState({ isSdkLoaded: true });
    }

    loadSdkAsynchronously() {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?139';
        el.async = true;
        el.id = 'vk-jssdk';
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    checkLoginState = (response) => {
        console.log(this.props);
        this.setState({ isProcessing: false });
        const socialAutorization = this.props.socialAutorization
        window.VK.Api.call('users.get', {user_ids: response.session.user.id, fields: ['photo_400_orig']}, function(usersSet){
            socialAutorization(usersSet.response[0])
            // console.log(usersSet.response[0]);
        });
        // if (this.props.callback) {
        //     window.VK.Api.call('users.get', {user_ids: response.session.user.id, fields: ['photo_400_orig']}, this.props.callback);
        //
        // }
    };

    click = () => {
        if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.disabled) {
            return;
        }
        this.setState({ isProcessing: true });
        window.VK.Auth.login(this.checkLoginState);
    };

    style() {
        return <style dangerouslySetInnerHTML={{ __html: styles }}/>;
    }

    containerStyle() {
        const style = { transition: 'opacity 0.5s' };
        if (this.state.isProcessing || !this.state.isSdkLoaded || this.props.disabled) {
            style.opacity = 0.6;
        }
        return Object.assign(style, this.props.containerStyle);
    }


    render() {
        let vkWrapAfterAuth
        if (this.state.userImage && this.state.userName && this.props.vkData){
            vkWrapAfterAuth = (
                <div className="vk-wrap">
                    <span>{this.state.userName}</span>
                    <img src={this.state.userImage} />
                </div>
            )
        }else{
            vkWrapAfterAuth = (
                <span style={ this.containerStyle() }>
                    <button
                        onClick={this.click}
                    >
                        Login with Vkontakte123
                    </button>
                </span>
            )
        }
        return <div>
            {vkWrapAfterAuth}
        </div>
    }
}
