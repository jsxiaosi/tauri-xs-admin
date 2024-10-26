import { defineFakeRoute } from 'vite-plugin-fake-server/client';

const power = [
  {
    path: '/welcome',
    name: 'RtWelcome',
  },
  {
    path: '/nested',
    name: 'RtNested',
    children: [
      {
        path: 'menu1',
        name: 'RtMenu1',
        children: [
          {
            path: 'menu1-1',
            name: 'RtMenu1-1',
          },
          {
            path: 'menu1-2',
            name: 'RtMenu1-2',
            children: [
              {
                path: 'menu1-2-1',
                name: 'RtMenu1-2-1',
              },
              {
                path: 'menu1-2-2',
                name: 'RtMenu1-2-2',
              },
            ],
          },
          {
            path: 'menu1-3',
            name: 'RtMenu1-3',
          },
        ],
      },
      {
        path: 'menu2',
        name: 'RtMenu2',
      },
    ],
  },
  {
    path: '/details_page',
    name: 'RtDetailsPage',
  },
];

const adminPermissionRouter = [
  {
    path: '/permissions',
    name: 'RtPermissions',
    children: [
      {
        path: 'page',
        name: 'RtPermissionsPage',
      },
      {
        path: 'test-page-admin',
        name: 'RtPermissionsTestPageAdmin',
      },
    ],
  },
];

const testPermissionRouter = [
  {
    path: '/permissions',
    name: 'RtPermissions',
    children: [
      {
        path: 'page',
        name: 'RtPermissionsPage',
      },
      {
        path: 'test-page-test',
        name: 'RtPermissionsTestPageTest',
      },
    ],
  },
];

// permissionRouter

export default defineFakeRoute([
  {
    url: '/mock_api/getRoute',
    timeout: 0,
    method: 'post',
    response: ({ body }: { body: Recordable }) => {
      const { name } = body;
      if (name === 'admin') {
        return {
          data: [...power, ...adminPermissionRouter],
          code: 1,
          message: 'ok',
        };
      } else if (name === 'test') {
        return {
          data: [...power, ...testPermissionRouter],
          code: 1,
          message: 'ok',
        };
      } else {
        return {
          data: [],
          code: -1,
          message: '账号错误',
        };
      }
    },
  },
]);
