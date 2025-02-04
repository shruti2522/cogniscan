import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',  
    alignItems: 'center',     
    paddingTop: theme.spacing(4), 
  },
  chatContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    borderBottom: '1px solid #ccc',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2), 
  }
}));

const ChatList = () => {
  const classes = useStyles();

  const chatListData = [
    {
      username: 'user1',
      avatarUrl: 'https://i.pinimg.com/736x/82/97/de/8297dee2d3f3e92a18cca6191d35938d.jpg',
      lastMessage: 'Hello there!',
    },
    {
      username: 'user2',
      avatarUrl: 'https://i.pinimg.com/736x/0b/da/46/0bda461796074a044ba35643eb71d94c.jpg',
      lastMessage: 'How are you doing?',
    },
    {
      username: 'user3',
      avatarUrl: 'https://i.pinimg.com/736x/27/7f/f8/277ff82c18bd1fc2a7554762cc4a3e13.jpg',
      lastMessage: 'Hii!',
    },
    {
      username: 'user4',
      avatarUrl: 'https://i.pinimg.com/736x/63/dd/ed/63dded6d56d299f75e1ebff5451bbacc.jpg', 
      lastMessage: 'Where are you?',
    },
    {
      username: 'user5',
      avatarUrl: 'https://i.pinimg.com/736x/5e/da/91/5eda919a62ca250f2d81fb3b0c99a600.jpg', 
      lastMessage: 'How you doing?',
    },
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h1">
        Messages
      </Typography>
      <List className={classes.chatContainer}>
        {chatListData.map((chat, index) => (
          <Link to={`/chat/${chat.username}`} key={index}  style={{ textDecoration: 'none' }}>
            <ListItem className={classes.listItem} button>
              <ListItemAvatar>
                <Avatar alt={chat.username} src={chat.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.username} 
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {chat.lastMessage}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default ChatList;