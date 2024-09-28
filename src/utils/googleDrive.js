import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID_DAVID,
  process.env.GOOGLE_SECRET_DAVID,
  process.env.HOST
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN_DAVID,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function getAccessToken() {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
    return credentials.access_token;
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to get access token");
  }
}

async function findFolderIdByPath(path) {
  try {
    await getAccessToken();
    const parts = path.split("/");
    let parentFolderId = "root"; // Start at the root
    for (let part of parts) {
      const response = await drive.files.list({
        q: `'${parentFolderId}' in parents and name='${part}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: "files(id, name)",
        spaces: "drive",
      });

      if (response.data.files.length === 0) {
        throw new Error(`Folder ${part} not found`);
      }

      parentFolderId = response.data.files[0].id;
    }
    return parentFolderId;
  } catch (error) {
    console.error(
      "Error finding folder by path in Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to find folder by path");
  }
}

async function findFolderIdByName(name, parentFolderId) {
  try {
    await getAccessToken();
    const response = await drive.files.list({
      q: `'${parentFolderId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id,  name, mimeType, webViewLink, webContentLink)",
      spaces: "drive",
    });
    if (response.data.files.length) {
      return response.data.files[0]; // Return existing folder ID
    } else {
      return null; // Return null if not found
    }
  } catch (error) {
    console.error(
      "Error finding folder by name in Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to find folder by name");
  }
}

async function renameFolder(folderId, newName) {
  try {
    const response = await drive.files.update({
      fileId: folderId,
      resource: { name: newName },
      fields: "id, name, mimeType, webViewLink, webContentLink",
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error renaming folder in Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to rename folder");
  }
}

async function uploadToDrive(file, folderId) {
  try {
    await getAccessToken();
    const fileMetadata = {
      name: file.name,
      parents: [folderId],
    };

    const media = {
      mimeType: file.type,
      body: file.stream,
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, name, mimeType, webViewLink, webContentLink",
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading file to Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to upload file");
  }
}

async function createFolder(name, parentFolderId = null) {
  try {
    await getAccessToken();
    const fileMetadata = {
      name: name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentFolderId ? [parentFolderId] : [],
    };

    const createResponse = await drive.files.create({
      resource: fileMetadata,
      fields: "id, name, mimeType, webViewLink, webContentLink",
    });

    return createResponse.data;
  } catch (error) {
    console.error(
      "Error creating folder in Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to create folder");
  }
}

async function setFilePermissions(fileId, role = "reader") {
  try {
    await getAccessToken();
    const permissions = {
      type: "anyone", // This makes the file available to anyone with the link
      role: role,
    };

    await drive.permissions.create({
      fileId: fileId,
      resource: permissions,
    });
  } catch (error) {
    console.error(
      "Error setting file permissions in Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to set file permissions");
  }
}

async function setFolderPermissions(folderId, emailAddresses, role = "reader") {
  try {
    await getAccessToken();
    const permissionsPromises = emailAddresses.map((email) => {
      const permissions = {
        type: "user",
        role: role,
        emailAddress: email,
      };

      return drive.permissions.create({
        fileId: folderId,
        resource: permissions,
        fields: "id",
        sendNotificationEmail: false,
      });
    });

    await Promise.all(permissionsPromises);
  } catch (error) {
    console.error("Error setting folder permissions in Google Drive:", error);
    throw new Error("Unable to set file permissions");
  }
}

async function deleteFileFromDrive(fileId) {
  try {
    await getAccessToken();
    await drive.files.delete({
      fileId: fileId,
    });
  } catch (error) {
    console.error(
      "Error deleting file on Google Drive:",
      error.response ? error.response.data : error
    );
    throw new Error("Unable to delete file");
  }
}

export {
  findFolderIdByPath,
  findFolderIdByName,
  renameFolder,
  uploadToDrive,
  createFolder,
  setFilePermissions,
  setFolderPermissions,
  deleteFileFromDrive,
};
