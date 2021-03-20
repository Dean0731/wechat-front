<style>
    .login {
        width: 400px;
        margin: 0 auto;
    }
</style>
<template>
  <div id="app">
    <div class="login">
        <div class="ivu-login">
            <form autocomplete="off" class="ivu-form ivu-form-label-right">
                <div class="ivu-login-username">
                    <div class="ivu-form-item ivu-form-item-required"><!---->
                        <div class="ivu-form-item-content">
                            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type-text"><!----> <!---->
                                <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                                <input autocomplete="off" spellcheck="false" type="text" placeholder="请输入用户名"
                                       name="username" class="ivu-input ivu-input-large ivu-input-with-prefix"> <span
                                        class="ivu-input-prefix"><i
                                        class="ivu-icon ivu-icon-ios-contact-outline"></i></span></div> <!----></div>
                    </div>
                </div>
                <div class="ivu-login-password">
                    <div class="ivu-form-item ivu-form-item-required"><!---->
                        <div class="ivu-form-item-content">
                            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type-password"><!---->
                                <!----> <i
                                        class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                                <input autocomplete="off" spellcheck="false" type="password" placeholder="请输入密码"
                                       name="password" class="ivu-input ivu-input-large ivu-input-with-prefix"> <span
                                        class="ivu-input-prefix"><i
                                        class="ivu-icon ivu-icon-ios-lock-outline"></i></span></div> <!----></div>
                    </div>
                </div>
                <div class="demo-auto-login"><label
                        class="ivu-checkbox-wrapper ivu-checkbox-wrapper-checked ivu-checkbox-large"><span
                        class="ivu-checkbox ivu-checkbox-checked"><span class="ivu-checkbox-inner"></span> <input
                        type="checkbox" class="ivu-checkbox-input"></span> 自动登录</label> <a>忘记密码</a></div>
                <div class="ivu-login-submit">
                    <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-long ivu-btn-large"><!----> <!---->
                        <span>登录</span></button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

