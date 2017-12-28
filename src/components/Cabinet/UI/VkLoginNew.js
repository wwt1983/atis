import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

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
        if (!this.props.vkData && this.props.vkId && this.props.vkId !='0'){
            this.setFbAsyncInit();
        }
        this.loadSdkAsynchronously();
    }

    sdkLoaded() {
        this.setState({ isSdkLoaded: true })
    }

    loadSdkAsynchronously() {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?139';
        el.async = true;
        el.id = 'vk-jssdk';
        document.getElementsByTagName('head')[0].appendChild(el);

        if (document.getElementById('vk-jssdk')) {
            this.sdkLoaded();
            return;
        }
    }

    setFbAsyncInit() {
        const { apiId } = this.props;
        window.vkAsyncInit = () => {
            window.VK.init({ apiId });
            this.setState({ isSdkLoaded: true });
            this.getUserInfoMation(parseInt(this.props.vkId))
        };
    }

    getUserInfoMation(id){
        const socialAutorization = this.props.socialAutorization
        window.VK.Api.call('users.get', {user_ids: id, fields: ['photo_400_orig']}, function(usersSet){
            socialAutorization(usersSet.response[0], 'vkData')
        });
    }



    checkLoginState = (response) => {

        const socialAutorization = this.props.socialAutorization

        this.setState({ isProcessing: false });

        window.VK.Api.call('users.get', {user_ids: response.session.user.id, fields: ['photo_400_orig']}, function(usersSet){
            socialAutorization(usersSet.response[0], 'vkData')
        });

    };

    click = () => {
        const { apiId } = this.props
        window.VK.init({ apiId })
        this.setState({ isProcessing: true });
        window.VK.Auth.login(this.checkLoginState);
    };

    render() {

        let vkWrapAfterAuth
        if (this.state.userImage && this.state.userName && this.props.vkData){
            vkWrapAfterAuth = (
                <div className='vk-wrap'>
                    <span>{this.state.userName}</span>
                    <img src={this.state.userImage} />
                </div>
            )
        }else{
            vkWrapAfterAuth = (
                <div className='non-auth'>
                    <RaisedButton
                        label='Вход через в VK'
                        primary={true}
                        onClick={this.click}
                    />
                </div>
            )
        }

        return vkWrapAfterAuth
    }
}
