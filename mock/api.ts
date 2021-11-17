export default {
  'GET /api/devices': {
    code: 300,
    data: [
      {
        id: 'device1',
        name: '设备1',
        datasourcePara: [
          {
            parameterKey: 'deviceId',
            parameterName: '设备Id',
          },
        ],
      },
      { id: 'device2', name: '设备2', datasourcePara: null },
      {
        id: 'device4',
        name: '设备4',
        datasourcePara: [
          {
            parameterKey: 'deviceId321',
            parameterName: '设备Id',
          },
          {
            parameterKey: 'deviceI321d',
            parameterName: '设备Id312',
          },
        ],
      },
    ],
  },
  'GET /api/models': {
    code: 300,
    data: [
      { id: 'model1', ruleName: '模型1', paramList: null },
      {
        id: 'model2',
        ruleName: '模型2',
        paramList: [
          {
            parameterKey: 'deviceId323',
            parameterName: 'Iddsad',
          },
          {
            parameterKey: 'deviceI4d',
            parameterName: 'rwerewrId',
          },
        ],
      },
    ],
  },
  'GET /api/warns': {
    code: 300,
    data: [
      { id: 'warn1', name: '告警1', value: ['告警参数1', '告警参数2'] },
      //   { id: 'id4', name: '告警2', value: ['00', '77', '999'] },
    ],
  },
  '/modals': { id: 1 },
};
