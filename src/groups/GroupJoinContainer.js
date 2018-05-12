import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import GroupJoin from './GroupJoin';
import firebase, { db } from '../Firebase';

/**
 * GroupJoinContainer is in charge of handling joining group logic.
 */
class GroupJoinContainer extends PureComponent {
  state = {
    isJoined: false,
    error: '',
  };

  onSubmit = ({ formData }) => {
    const email = formData.email;

    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        const groupUid = snapshot.docs[0].id;
        firebase
          .auth()
          .onAuthStateChanged((user) => {
            const uid = user.uid;

            db.collection('users')
              .doc(uid)
              .set({
                group: groupUid
              }, { merge: true })
              .then(_ => {
                db.collection('groups')
                  .doc(groupUid)
                  .get('members')
                  .then((members) => {
                    members.push(uid);

                    db.collection('groups')
                      .doc(groupUid)
                      .set({
                        members: members
                      }).then(_ => {
                        this.setState({ isJoined: true });
                      });
                  });
              });
          });
      });
  };

  render() {
    if (this.state.isJoined) return <Redirect to="/" />;
    return <GroupJoin onSubmit={this.onSubmit} error={this.state.error} />;
  }
}

export default GroupJoinContainer;
