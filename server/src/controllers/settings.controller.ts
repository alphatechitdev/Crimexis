import Settings from "../models/settings.model.ts";


class SettingsController {
    constructor () {

    }



    async fetchSettings () {
        try {
            const settings = await Settings.find({});

            return {success: true, settings: settings};

        } catch (error) {
            console.error("Error While Fetching The Settings, ", error);
            return {success: false, settings: null};
        }
    }
};

export default SettingsController;


