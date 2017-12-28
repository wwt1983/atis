import React, { Component } from 'react'

export default class FbLogin extends Component {

    componentWillMount(){
        this.setState ({
            isSdkLoaded: false,
            isProcessing: false
        })

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
    render() {
        return <div></div>
    }
}
