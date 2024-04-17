//选手端引入
import playerNotice from "../pages/player_notice"
import playerRank from "../pages/player_rank"
import playerTarget from "../pages/player_target"
//管理端引入
import managerMain from "../pages/manager_main.vue"
import managerFlag from "../pages/manager_flag.vue"
import managerTarget from "../pages/manager_target.vue"
import managerTeam from "../pages/manager_team.vue"
import managerScreen from "../pages/manager_screen.vue"
import managerWebhook from "../pages/manager_webhook.vue"
import managerConfig from "../pages/manager_config.vue"
import managerAccount from "../pages/manager_account.vue"
import managerMirror from "../pages/manager_mirror.vue"
import managerNotice from "../pages/manager_notice.vue"
import managerQuiz from "../pages/manager_quiz.vue"
import managerMonitor from "../pages/manager_monitor.vue"
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../pages/Login_manager.vue"
import LoginPlayer from "../pages/Login_player.vue"
const routes = [
  {
    path: "/manager",
    component: Login,
  },
  {
    path: "/",
    component: LoginPlayer,
    name:"LoginPlayer"
  },
  // player选手端路由规则
  {
    path: "/player_notice",
    component: playerNotice,
    //设置权限
    meta:{isAuth:true},
  },
  {
    path: "/player_rank",
    component: playerRank,
    meta:{isAuth:true},
  },
  {
    path: "/player_target",
    component: playerTarget,
    meta:{isAuth:true},
  },
  // manager管理端路由规则
  //账号管理
  {
    path: "/manager_account",
    component: managerAccount,
    meta:{isAuth:true},
  },
  //系统监控
  {
    path: "/manager_monitor",
    component: managerMonitor,
    meta:{isAuth:true},
  },
  //配置管理
  {
    path: "/manager_config",
    component: managerConfig,
    meta:{isAuth:true},
  },
  //flag管理
  {
    path: "/manager_flag",
    component: managerFlag,
    meta:{isAuth:true},
  },
  //主页
  {
    name: "main",
    path: "/manager_main",
    component: managerMain,
    meta:{isAuth:true},
  },
  //镜像管理
  {
    path: "/manager_mirror",
    component: managerMirror,
    meta:{isAuth:true},
  },
  //公告管理
  {
    path: "/manager_notice",
    component: managerNotice,
    meta:{isAuth:true},
  },
  //题目管理
  {
    path: "/manager_quiz",
    component: managerQuiz,
    meta:{isAuth:true},
  },
  //大屏管理
  {
    path: "/manager_screen",
    component: managerScreen,
    meta:{isAuth:true},
  },
  //靶机管理
  {
    path: "/manager_target",
    component: managerTarget,
    meta:{isAuth:true},
  },
  //队伍管理
  {
    path: "/manager_team",
    component: managerTeam,
    meta:{isAuth:true},
  },
  //webhook
  {
    path: "/manager_webhook",
    component: managerWebhook,
    meta:{isAuth:true},
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
	if(to.meta.isAuth){ //判断是否需要鉴权
		if(sessionStorage.getItem('Token') != null){
      console.log("haha",sessionStorage.getItem('Token') == null);
			next()
		}else{
			alert('无权限查看！')
		}
	}else{
		next()
	}
})

export default router