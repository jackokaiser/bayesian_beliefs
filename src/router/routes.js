const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/question/',
    component: () => import('layouts/ViewLayout.vue'),
    children: [
      { path: ':questionId/add-evidence', component: () => import('pages/AddEvidence.vue'), name: 'add-evidence', props: true },
      { path: ':questionId/add-hypothesis', component: () => import('pages/AddHypothesis.vue'), name: 'add-hypothesis', props: true }
    ]
  },
  {
    path: '/question/',
    component: () => import('layouts/ViewLayout.vue'),
    props: { backArrow: function (router) { router.push('/') } },
    children: [
      { path: ':questionId', component: () => import('pages/Question.vue'), name: 'question', props: true }
    ]
  },
  {
    path: '/add-question',
    component: () => import('layouts/ViewLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddQuestion.vue') }
    ]
  },
  {
    path: '/about',
    component: () => import('layouts/ViewLayout.vue'),
    children: [
      { path: '', component: () => import('pages/About.vue'), name: 'about' }
    ]
  },
  {
    path: '/privacy-policy',
    component: () => import('layouts/ViewLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PrivacyPolicy.vue'), name: 'privacy' }
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
