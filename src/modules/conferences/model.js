import { HOST } from "../../config.js";
import { fetch, fetchAll } from "../../lib/postgres.js";
import query from "./query.js";

const GET = async ({ page = 1, limit = 9, status = "active" }, { conferenceId = 0 }) => {
    let conferences = await fetchAll(query.GET, page - 1, limit, status, conferenceId);

    conferences = conferences.map((conference) => {
      delete conference.to_json.post.conference_id;

      for (let i = 0; i < conference.to_json.post.post_images.length; i++) {
        if (conference.to_json.post.post_images[i]) {
          conference.to_json.post.post_images[i] =
            HOST + "/" + conference.to_json.post.post_images[i];
        }
      }

      return conference.to_json;
    });

    return conferences;

};

const POST = async (
  {
    conferenceDate,
    conferenceType = "online",
    conferenceLink,
    categoryId,
    subCategoryId,
    organizer,
    post,
  },
  userId
) => {
    const {
      organizationName,
      organizerName,
      organizerProfession,
      organizerType = "jismoniy",
      organizerPhone,
      organizerPhoneStuck,
    } = organizer;

    let conferenceOrganizer = await fetch(
      query.POSTORGANIZER,
      organizerName,
      organizerProfession,
      organizerType,
      organizerPhone,
      organizerPhoneStuck,
      userId
    );

    const { organizer_id, organizer_name, organizer_profession, organizer_type } =
      conferenceOrganizer;

    let conference = await fetch(
      query.POSTCONFERENCE,
      conferenceDate,
      conferenceType,
      organizer_id,
      categoryId,
      subCategoryId
    );
    conference.organizer = conferenceOrganizer;

    if (organizer_type == "yuridik") {
      let conferenceOrganization = await fetch(
        query.POSTORGANIZATION,
        organizationName,
        organizer_id
      );
      conference.organizer.organization_name = conferenceOrganization.organization_name;
    }

    const { conference_id } = conference;
    if (conferenceType == "online" || !conferenceType) {
      let conferenceUrl = await fetch(query.POSTCONFERENCELINK, conferenceLink, conference_id);
      conference.conference_link = conferenceUrl;
    }

    const { postTitle, postDescription, postBodys } = post;
    let conferencePost = await fetch(
      query.POSTCONFERENCEPOST,
      postTitle,
      postDescription,
      conference_id
    );

    conference.post = conferencePost;

    const { post_id } = conferencePost;
    conference.post.post_bodys = [];
    for (let body of postBodys) {
      let conferencePostBody = await fetch(query.POSTCONFERENCEPOSTBODY, body, post_id);
      conference.post.post_bodys.push(conferencePostBody);
    }

    return conference;
};

const PUTSTATUS = async ({ conferenceId }, { status }) => {

    let conference = await fetch(query.PUTSTATUS, conferenceId, status);

    return conference;

};

export default { GET, POST, PUTSTATUS };
