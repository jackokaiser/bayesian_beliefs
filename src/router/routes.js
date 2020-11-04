const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/question/:questionId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/question/:questionId', component: () => import('pages/Question.vue'), props: true }
    ]
  },
  {
    path: '/add-question',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddQuestion.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
