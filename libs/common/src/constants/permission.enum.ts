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

  PostVerify = 'post:verify',
  PostUpdateFakeLikes = 'post:update-fake-likes',

  PostAddToTop = 'post:add-to-top',

  PostDelete = 'post:delete',
  PostRemoveFromTop = 'post:remove-from-top',
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

  [PermissionEnum.PostVerify]: 'Верификация постов',
  [PermissionEnum.PostUpdateFakeLikes]: 'Обновление фейковых лайков',

  [PermissionEnum.PostAddToTop]: 'Добавление в топ',

  [PermissionEnum.PostDelete]: 'Удаление поста',
  [PermissionEnum.PostRemoveFromTop]: 'Удаление из топ',
};
