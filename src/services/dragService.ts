import request from '@/utils/request';

export function getDeviceList(parame: any) {
  return request.get('/api/devices');
}

export function getModelRuleList(parame: any) {
  return request.get('/api/models');
}

export function getNullParamPage(parame: any) {
  return request.get('/api/warns');
}

export function getRadiusConfig() {
  return request.get('/emergencyService/getRadiusConfig');
}

export function getEquipment(parame) {
  return request.get('/emergencyService/getEquipment');
}

export function getMonitor(parame) {
  return request.get('/emergencyService/getMonitor');
}
