import css from './MarkupTweets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredTweets, toggleUserSubscribe } from 'redux/sliceUserKey';
import { selectUserKeys } from 'redux/selectors';
import { useState } from 'react';
import {
  FOLLOW,
  FOLLOWING,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from 'Services/variables';
import { useUpdateTweetMutation } from 'redux/tweetsApi';

import logo from '../../assets/logo-go-it.png';
import messages from '../../assets/messages.png';
import defaultAvatar from '../../assets/default-avatar.png';

import Notiflix from 'notiflix';

export function MarkupTweets(props) {
  const { user, avatar, followers, tweets, id } = props;
  const [updateTweet] = useUpdateTweetMutation();
  const dispatch = useDispatch();
  const isExist = useSelector(selectUserKeys);
  const [btnColor, setBtnColor] = useState(
    isExist.includes(id) ? SECONDARY_COLOR : PRIMARY_COLOR
  );

  const toggleFollow = followers => {
    dispatch(toggleUserSubscribe(id));
    if (isExist.includes(id)) {
      followers = followers - 1;
      setBtnColor(PRIMARY_COLOR);
      Notiflix.Notify.warning(`You unsubscribed to ${user}`);
    } else {
      followers = followers + 1;
      setBtnColor(SECONDARY_COLOR);
      Notiflix.Notify.success(`You subscribed to ${user}`);
    }

    dispatch(setFilteredTweets());
    updateTweet({ user, avatar, followers, tweets, id });
  };

  const numberOptions = { style: 'decimal', minimumFractionDigits: 0 };

  return (
    <li className={css.listItem}>
      <img src={logo} alt="goIT" className={css.logo} />
      <img src={messages} alt="messages" className={css.messages} />

      <div className={css.line}>
        <div className={css.circle}>
          <img
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
            className={css.avatar}
          />
        </div>
      </div>

      <p className={`${css.title} ${css.tweets}`}>
        {tweets.toLocaleString('en-US', numberOptions)} TWEETS
      </p>

      <p className={`${css.title} ${css.followers}`}>
        {followers.toLocaleString('en-US', numberOptions)} FOLLOWERS
      </p>
      <button
        type="button"
        className={css.btn}
        style={{ backgroundColor: btnColor }}
        onClick={() => {
          toggleFollow(followers);
        }}
      >
        {isExist.includes(id) ? FOLLOWING : FOLLOW}
      </button>
    </li>
  );
}
