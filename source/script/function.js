// ZJU-cs-basic-opt
// function.js - 功能函数

function c_cntr()
{
    this.view = new tot_view();
    this.model = new cmodel(this.view);
    //this.view_init();
}
c_cntr.prototype = {
    login: function() {
        var data = $("#frmLogin").serialize();
        t = this;
        this.model.fetch("login", data, function(a){t._login(a)});
    },
    _login: function(ret) {
        if (ret.login_succ)
        {
            //登录成功，反馈view
            var t = this;
            this.model.fetch("login_succ", '', function(a) {
                t.user_o = a;
                t.view.loginview(t.user_o.user_info, 1);
                t.view.normalview(a.lesson_title, a.lesson_info, function(b){$("#nav-info-layer-b").html(a.lesson_title[b]+'：'+a.lesson_announce[b])});
                for (var i in a.task_obj)
                {
                    url_list['task'+i] = a.task_obj[i];
                }
                t.view.showtask(a.task_title, a.task_obj);
            });
        } else {
            //登录失败，同样要反馈view
            if (ret.login_fail) this.view.loginview(ret.login_fail, 0);
        }
    },
    logout: function() {
        this.model.fetch('logout');
        this.view.loginshow();
    },
    switchTask: function(id) {
        var ids = ['rp-experiment', 'rp-homework', 'rp-file', 'rp-document'];
        
    },
}

$(document).ready(function() {
	init();
});

function init()
{
    if (typeof jQuery == 'undefined' || typeof cmodel == 'undefined' || typeof tab_switcher == 'undefined')
    {
        setTimeout(init, 100);
        return;
    }
    controller = new c_cntr();
}