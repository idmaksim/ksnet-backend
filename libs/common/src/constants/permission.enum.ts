export enum PermissionEnum {
  PermissionSearch = 'permission:search',
  PermissionGet = 'permission:get',

  RoleCreate = 'role:create',
  RoleGet = 'role:get',
  RoleUpdate = 'role:update',
  RoleSearch = 'role:search',
  RoleDelete = 'role:delete',

  UserCreate = 'user:create',
  UserGet = 'user:get',
  UserUpdate = 'user:update',
  UserDelete = 'user:delete',
  UserBan = 'user:ban',
  UserSearch = 'user:search',
}

export const PermissionTitles: Record<PermissionEnum, string> = {
  [PermissionEnum.PermissionSearch]: 'Поиск разрешений',
  [PermissionEnum.PermissionGet]: 'Получение разрешений',

  [PermissionEnum.RoleCreate]: 'Создание ролей',
  [PermissionEnum.RoleGet]: 'Получение ролей',
  [PermissionEnum.RoleUpdate]: 'Обновление ролей',
  [PermissionEnum.RoleSearch]: 'Поиск ролей',
  [PermissionEnum.RoleDelete]: 'Удаление ролей',

  [PermissionEnum.UserCreate]: 'Создание пользователя',
  [PermissionEnum.UserGet]: 'Получение пользователя',
  [PermissionEnum.UserUpdate]: 'Обновление пользователя',
  [PermissionEnum.UserDelete]: 'Удаление пользователя',
  [PermissionEnum.UserBan]: 'Бан пользователя',
  [PermissionEnum.UserSearch]: 'Поиск пользователей',
};
