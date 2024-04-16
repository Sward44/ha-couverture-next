const { UserModel, AccountModel } = require("@/models");

const createUser = async (body) => {
  try {
    const result = await UserModel.findOne({ email: body.email }).lean().exec();
    const name = body?.email?.split("@")[0];
    if (!result) {
      const newUser = await UserModel.create({
        ...body,
        name,
        role: "user",
      });
      await AccountModel.create({ userId: newUser._id });
      return {
        isError: false,
        data: {
          id: newUser?._id?.toString(),
          name: newUser.name,
          role: newUser.role,
          email: newUser.email,
          image_logo: newUser.avatar,
        },
        message: "Succès 'createUser' !",
      };
    }

    return {
      isError: false,
      data: {
        id: result?._id?.toString(),
        name: result.name,
        role: result.role,
        email: result.email,
        image_logo: result.image_logo,
      },
      message: "Succès 'createUser'",
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message:
        "Une erreur est survenue lors de la requête 'createUser', reassayer plus tard !",
    };
  }
};

const getCurrentUser = async (id) => {
  try {
    const result = await UserModel.findOne({ _id: id }).lean().exec();
    if (!result)
      return {
        isError: true,
        data: null,
        message: "Utilisateur n'existe pas!",
      };
    return {
      isError: false,
      data: {
        id: result?._id?.toString(),
        name: result.name,
        role: result.role,
        email: result.email,
        image_logo: result.image_logo,
      },
      message: "Succès 'getCurrentUsers' !",
    };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message:
        "Une erreur es survenu lors de la requête 'getCurrentUsers', reassayer plus tard !",
    };
  }
};

const getAllUsers = async () => {
  try {
    const results = await UserModel.find({}).lean().exec();
    const data = results?.map((user) => ({
      id: user?._id?.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      image_logo: user.image_logo,
    }));
    return { isError: false, data, message: "Succès 'getAllUsers' !" };
  } catch (error) {
    return {
      isError: true,
      data: null,
      message:
        "Une erreur es survenu lors de la requête 'getAllUsers', reassayer plus tard !",
    };
  }
};

const UserService = { createUser, getCurrentUser, getAllUsers };

export default UserService;
