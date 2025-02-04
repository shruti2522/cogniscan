
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { UPDATE_FOLLOW_DATA } from "../contexts/types";
import { axiosConfig, PROD_URL } from "../config/constants";
// Material-UI Components
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// General Styles
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 935,
		margin: "auto",
		padding: "60px 20px 0",
	},
	avatar_container: { margin: "auto" },
	avatar: { width: 152, height: 152 },
	editButton: {
		marginLeft: 20,
		backgroundColor: "paleturquoise",
	},
	posts_img: {
		width: "100%",
		height: "100%",
	},
	settings: {},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const UserProfilePage = () => {
	const classes = useStyles();
	const [value, setValue] = useState("Posts"); // to switch between different tabs
	const { state, dispatch } = useContext(AuthenticationContext);
	console.log('user profile state here', state)


	const { userid } = useParams();
	const [data, setData] = useState(null);
	const [showFollow, setShowFollow] = useState(state.user ? !state.user.following.includes(userid) : null);

	const config = axiosConfig();

	useEffect(() => {
		axios.get(`${PROD_URL}/user/${userid}`, config).then((res) => {
			setData(res.data);
		});
	}, []);

	const followUser = () => {
		axios.put(`${PROD_URL}/follow`, { followId: userid }, config).then((result) => {
			dispatch({
				type: UPDATE_FOLLOW_DATA,
				payload: { followers: result.data.followers, following: result.data.following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				return {
					...prevState,
					user: {
						...prevState.user,
						followers: [...prevState.user.followers, result.data._id],
					},
				};
			});
			setShowFollow(false);
		});
	};

	const unfollowUser = () => {
		axios.put(`${PROD_URL}/unfollow`, { unfollowId: userid }, config).then((result) => {
			dispatch({
				type: UPDATE_FOLLOW_DATA,
				payload: { followers: result.data.followers, following: result.data.following },
			});
			localStorage.setItem("user", JSON.stringify(result.data));
			setData((prevState) => {
				const newFollower = prevState.user.followers.filter((item) => item !== result.data._id);
				return {
					...prevState,
					user: {
						...prevState.user,
						followers: newFollower,
					},
				};
			});
			setShowFollow(true);
		});
	};

	console.log("user data", data);

	return (
		<React.Fragment>
			<CssBaseline />
			{data ? (
				<Box component="main" className={classes.root}>
					<Box mb="44px">
						<Grid container>
							<Grid item xs={4} className={classes.avatar_container}>
								<Avatar
									className={classes.avatar}
									style={{ margin: "auto" }}
									src="https://i.pinimg.com/1200x/f5/f8/43/f5f843fa1dd48119755990bd520bb110.jpg"
								/>
							</Grid>
							<Grid item xs={8}>
								<Box clone mb="20px">
									<Grid container alignItems="center">
										<Typography variant="h5">
											{data.user ? data.user.username : "Is Loading ..."}
										</Typography>
										{showFollow ? (
											<Button
												className={classes.editButton}
												variant="outlined"
												onClick={() => followUser()}
											>
												Follow
											</Button>
										) : (
											<Button
												className={classes.editButton}
												variant="outlined"
												onClick={() => unfollowUser()}
											>
												UnFollow
											</Button>
										)}

										<div className={classes.settings}>
											<IconButton component={Link} to="#">
												<Icon>settings</Icon>
											</IconButton>
										</div>
									</Grid>
								</Box>
								<Box mb="20px">
									<Grid container spacing={4}>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.posts
														? data.posts.length
														: "IsLoading..."}
												</b>{" "}
												posts
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.user
														? data.user.followers.length
														: "IsLoading..."}
												</b>{" "}
												followers
											</Typography>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1">
												<b>
													{data.user
														? data.user.following.length
														: "IsLoading..."}
												</b>{" "}
												following
											</Typography>
										</Grid>
									</Grid>
								</Box>
								<Typography variant="subtitle1">Glipmpse User</Typography>
								<Typography variant="subtitle1">Varanasi, India</Typography>
							</Grid>
						</Grid>
					</Box>
					<Tabs
						value={value}
						centered
						onChange={(event, value) => {
							setValue(value);
						}}
						TabIndicatorProps={{
							style: { transform: "translateY(-70px)", backgroundColor: "#262626" },
						}}
					>
						<Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
						<Tab label="IGTV" value="IGTV" icon={<Icon>live_tv</Icon>} disabled />
						<Tab
							label="Tagged"
							value="Tagged"
							icon={<Icon>local_offer_outlined</Icon>}
							disabled
						/>
					</Tabs>
					<TabPanel value={value} index="Posts">
						<Grid container spacing={2}>
							{data.posts.map((item) => (
								<Grid item xs={4} key={item.id} className={classes.posts}>
								<Box position="relative">
									<img
										className={classes.posts_img}
										alt="post"
										src={`data:${item.photoType};base64,${item.photo}`}
									/>
								</Box>
							</Grid>
							))}
						</Grid>
				    </TabPanel>
				</Box>
			) : (
				"Is Loading ..."
			)}
		</React.Fragment>
	);
};

export default UserProfilePage;
