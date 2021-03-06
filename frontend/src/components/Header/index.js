import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { MdExitToApp } from 'react-icons/md';
import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Meetapp" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            {/* <Link to="/profile">
              <img
                src="https://api.adorable.io/avatars/50/abott@adorable.png"
                alt={profile.name}
              />
            </Link> */}
            <button type="button" onClick={handleSignOut}>
              <MdExitToApp size={16} color="#fff" />
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
