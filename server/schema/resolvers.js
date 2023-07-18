import { AuthenticationError } from "apollo-server-express";
import { User, Plant, Plantnote } from "../models/";
import { signToken } from "../utils/auth";

const resolvers = {
  Query: {
    // Query for a single user
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    // Query for all users
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    // Query for a single plant
    plant: async (parent, { id }) => {
      try {
        const plant = await Plant.findById(id);
        return plant;
      } catch (error) {
        throw new Error("Failed to fetch plant");
      }
    },
    // Query for all plants
    plants: async () => {
      try {
        const plants = await Plant.find({});
        return plants;
      } catch (error) {
        throw new Error("Failed to fetch plants");
      }
    },
    // Query for a single plantnote
    plantNote: async (parent, { id }) => {
      try {
        const plantNote = await Plantnote.findById(id);
        return plantNote;
      } catch (error) {
        throw new Error("Failed to fetch plantnote");
      }
    },
    // Query for all plantnotes
    plantNotes: async () => {
      try {
        const plantNotes = await Plantnote.find({});
        return plantNotes;
      } catch (error) {
        throw new Error("Failed to fetch plantnotes");
      }
    },
    // Query for a single user's plants
    userPlants: async (parent, { username }) => {
      try {
        const userPlants = await Plant.find({ username });
        return userPlants;
      } catch (error) {
        throw new Error("Failed to fetch user's plants");
      }
    },
    // Query for a single user's plantnotes for a single plant
    userPlantNotes: async (parent, { username, plantId }) => {
      try {
        const userPlantNotes = await Plantnote.find({ username, plantId });
        return userPlantNotes;
      } catch (error) {
        throw new Error("Failed to fetch user's plantnotes");
      }
    },
    // Query for a single user's plantnotes for all plants
    userAllPlantNotes: async (parent, { username }) => {
      try {
        const userAllPlantNotes = await Plantnote.find({ username });
        return userAllPlantNotes;
      } catch (error) {
        throw new Error("Failed to fetch user's plantnotes");
      }
    },
    // Query for a plant's notifications
    plantNotifications: async (parent, { id }) => {
      try {
        const plant = await Plant.findById(id);
        return plant.notification;
      } catch (error) {
        throw new Error("Failed to fetch plant notifications");
      }
    },
  },

  Mutation: {
    // Mutation to create a new user
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({
          username: username,
          email: email,
          password: password,
        });

        const token = signToken(user._id); // Generate token using user's _id

        return { token, user };
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to create user");
      }
    },
    // Mutation to update a user
    updateUser: async (parent, { id, username, email, password }) => {
      try {
        const user = await User.findByIdAndUpdate(id, {
          username: username,
          email: email,
          password: password,
        });

        const token = signToken(user._id); // Generate token using updated user's _id

        return { token, user };
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to update user");
      }
    },
    // Mutation to login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user._id);

      return { token, user };
    },

    // Mutation to update user information
    updateUserInformation: async (parent, { id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(id, input, { new: true });
        return user;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to update user information");
      }
    },

    // Mutation to change user password
    changePassword: async (parent, { id, currentPassword, newPassword }) => {
      try {
        const user = await User.findById(id);

        if (!user) {
          throw new Error("User not found");
        }

        const correctPw = await user.isCorrectPassword(currentPassword);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect current password");
        }

        user.password = newPassword;
        await user.save();

        return user;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to change password");
      }
    },

    // Mutation to add a plant note to a user's plant
    addPlantNoteToPlant: async (parent, { id, note, username }) => {
      try {
        // Find the associated user
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        // Find the plant within the user's plants array
        const plant = user.plants.find((plant) => plant._id.toString() === id);
        if (!plant) {
          throw new Error("Plant not found");
        }

        // Create the plant note
        const plantNote = await Plantnote.create({ note, username });

        // Add the plant note to the plant's plantNotes array
        plant.plantNotes.push(plantNote._id);
        await user.save();

        return plantNote;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to add plant note");
      }
    },
    // mutation to delete plant from user's plants
    deletePlant: async (parent, { id }) => {
      try {
        const deletedPlant = await Plant.findByIdAndDelete(id);
        if (!deletedPlant) {
          throw new Error("Plant not found");
        }

        // Remove the plant from the associated user's plants array
        const user = await User.findByIdAndUpdate(
          deletedPlant.username,
          { $pull: { plants: deletedPlant._id } },
          { new: true }
        );

        return deletedPlant;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to delete plant");
      }
    },
    // mutation to delete plant note from user's plant notes
    deletePlantNote: async (parent, { id }) => {
      try {
        // Find the plant note to be deleted
        const plantNote = await Plantnote.findById(id);
        if (!plantNote) {
          throw new Error("Plant note not found");
        }

        // Find the associated plant and user
        const plant = await Plant.findById(plantNote.plantId);
        const user = await User.findById(plant.username);

        if (!plant || !user) {
          throw new Error("Associated plant or user not found");
        }

        // Remove the plant note from the plant's plantNotes array
        plant.plantNotes.pull(id);
        await plant.save();

        // Delete the plant note from the database
        await Plantnote.findByIdAndDelete(id);

        return plantNote;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to delete plant note");
      }
    },
    // mutation to update plant image
    updatePlant: async (parent, { id, img }) => {
      try {
        // Find the associated user
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        // Find the plant within the user's plants array
        const plant = user.plants.find((plant) => plant._id.toString() === id);
        if (!plant) {
          throw new Error("Plant not found");
        }

        // Update the plant's image
        plant.img = img;
        await user.save();

        return plant;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to update plant");
      }
    },
    // mutation to update plant note
    updatePlantNote: async (parent, { id, note, username }) => {
      try {
        // Find the associated user
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        // Find the plant note within the user's plant notes
        const plantNote = user.plantNotes.find(
          (note) => note._id.toString() === id
        );
        if (!plantNote) {
          throw new Error("Plant note not found");
        }

        // Update the plant note's content
        plantNote.note = note;
        await user.save();

        return plantNote;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to update plant note");
      }
    },
    // mutation to set plant notification
    setPlantNotifications: async (parent, { id, notification }) => {
      try {
        const plant = await Plant.findByIdAndUpdate(id, { notification }, { new: true });
        return plant;
      } catch (error) {
        console.log(error.message);
        throw new Error("Failed to set plant notifications");
      }
    },
  },
};

export default resolvers;
