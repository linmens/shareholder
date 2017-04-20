import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: 'linmens'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    guige: Mock.mock('@county(true)'),
    'age|18-60': 1,
    pinpai: Mock.mock({
  "string|1-10": "AMD"
}),
    pic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491476959222&di=f308e6b8ba7966ed05f1cf1d4ab6a86f&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2F6g2ITTn9e_s6mapqfY0vcg%3D%3D%2F6608598146073590065.jpg'
  }));
}

export { LoginUsers, Users };
