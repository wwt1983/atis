import React, { Component } from 'react'

export default class GetSocialVk extends Component {

    componentWillMount(){
        this.setState ({
            isSdkLoaded: false,
            isProcessing: false
        })
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
    render() {
        return <div></div>
    }
}
