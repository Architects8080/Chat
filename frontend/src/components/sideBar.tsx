import React, { useEffect, useState } from 'react';
import './sideBar.scss';

const testUsers = [
	{
	  id: 1,
	  nickname: 'abc12'
	},
	{
	  id: 2,
	  nickname: 'def34'
	},
	{
	  id: 3,
	  nickname: 'ghi56'
	},
	{
	  id: 4,
	  nickname: 'jkl78'
	}
];

const testDM = [
	{
	  nickname: 'abc12',
	  message: 'hello'
	},
	{
		nickname: 'def34',
		message: 'hi'
	},
];

function SideBar() {
	const [DMopen, setDMOpen] = useState<boolean>(false);
	const [DMNickname, setDMNickname] = useState<string>('');

	const openDM = (e: React.MouseEvent<HTMLLIElement>) => {
		setDMNickname(e.currentTarget.innerText);
		setDMOpen(true);
	}

	const closeDM = () => setDMOpen(false);

	return (
	<aside>
		<div className="friendList">
			<div>친구 목록</div>
			<ul>
				{testUsers.map(user => (
				<li onClick={openDM}>@{user.nickname}</li>
				))}
			</ul>
		</div>
		{DMopen && (
		<div className="DM">
			<span>DM from {DMNickname}</span>
			<button onClick={closeDM}>닫기</button>
			<ul>
				{testDM.map(message => (
				<li><span>{message.nickname} : </span>{message.message}</li>
				))}
			</ul>
			<input placeholder="메시지를 입력해주세요"/>
			<button>전송</button>
		</div>
		)}
	</aside>
	);
}

export default SideBar;