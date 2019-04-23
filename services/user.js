/**
 * User service
 * Author: samueladewale
*/
const { clientHost } = require('./../environement')
const mongoose = require('mongoose')
const User = require('./../models/User')

/**
 * Creates a user
 *
 * @param{Object} data the data of the new user
 * @return{Promise}
*/
const createUser = (data) => {
	const user = new User({
		fullname: data.fullname ? data.fullname : '',
		username: data.username,
		password: data.password,
		profileUrl: '',
		relations: {
			followers: 0,
			followings: 0,
		},
		description: '',
		email: data.email,
		tel: '',
		website: '',
		place: {
			city: '',
			country: '',
		},
		grades: [],
		posts: 0,
		favorites: 0,
		new: true
	} )

	return user.save()
}

/**
 * Gets a user
 *
 * @param{Object} data some data of the user to get
 * @return{Promise}
*/
const getUser = (data) => {
	return User.findOne({
		$or: [
			{ username: data.username },
			{ email: data.email }
		]})
}

/**
 * Gets a user by password
 *
 * @param{Object} data some data of the user to get
 * @return{Promise}
*/
const getUserWithPassword = (data) => {
	return User.findOne({
		$or: [
			{ username: data.username },
			{ email: data.username }
		],
		password: data.password
	})
}

/**
 * Gets a user by email
 *
 * @param{Object} data some data of the user to get
 * @return{Promise}
*/
const getUserWithEmail = (data) => {
	return User.findOne({ email: data.email })
}

/**
 * Gets a user by id
 *
 * @param{Object} data some data of the user to get
 * @return{Promise}
*/
const getUserWithId = (data) => {
	return User.findOne({ _id: data.id })
}

/**
 * Gets a user by a username
 *
 * @param{Object} data some data of the user to get
 * @return{Promise}
*/
const getUserWithUsername = (data) => {
	return User.findOne({ username: data.username })
}

/**
 * Updates a users password
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const updateUserPassword = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $set: { password: data.newPassword } })
}

/**
 * Updates a users informations
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const updateUser = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $set: {
			fullname: data.fullname,
			description: data.description,
			place: {
				city: data.place.city,
				country: data.place.country
			},
			tel: data.tel,
			email: data.email,
			website: data.website
		} })
}


/**
 * Increments the users followers count
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const increaseUserFollowers = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $inc: {	'relations.followers': 1 } })
}

/**
 * Decrements the users followers count
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const decreaseUserFollowers = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $inc: {	'relations.followers': -1 } })
}

/**
 * Increments the users followings count
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const increaseUserFollowings = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $inc: {	'relations.followings': 1 } })
}

/**
 * Decrements the users followings count
 *
 * @param{Object} data some data of the user to update
 * @return{Promise}
*/
const decreaseUserFollowings = (data) => {
	return User.updateOne(
		{ _id: data.id }, 
		{ $inc: {	'relations.followings': -1 } })
}


module.exports = {
	createUser,
	getUser,
	getUserWithPassword,
	getUserWithEmail,
	getUserWithId,
	updateUserPassword,
	getUserWithUsername,
	updateUser,
	increaseUserFollowers,
	decreaseUserFollowers,
	increaseUserFollowings,
	decreaseUserFollowings
}
