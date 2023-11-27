const azure = require('azure-storage');
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING; 
const blobService = azure.createBlobService(connectionString);
const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const deleteImagesFromAzure = async (blobNames) => {
  const containerClient = blobServiceClient.getContainerClient('imgupload');

  if (Array.isArray(blobNames)) {
    for (const blobName of blobNames) {
      await deleteImageFromAzure(containerClient, blobName);
    }
  } else {
    await deleteImageFromAzure(containerClient, blobNames);
  }
};

const deleteImageFromAzure = async (containerClient, blobName) => {
  try {
    const options = {
      deleteSnapshots: 'include'
    };

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete(options);

    console.log(`Deleted blob ${blobName}`);
  } catch (error) {
    console.error(`Error deleting blob ${blobName}: ${error.message}`);
  }
};

const uploadImagesToAzure = async (images, folder) => {
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExtension = (file.name || '').split('.').pop();
        const blobName = `${folder}/${Date.now()}_${i}.${fileExtension}`;
        console.log(`Uploading ${blobName}`);

        try {
            await new Promise((resolve, reject) => {
                // Convert the file data to a Buffer
                const buffer = Buffer.from(new Uint8Array(file.data));

                blobService.createBlockBlobFromText('imgupload', blobName, buffer, { contentType: file.type }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        imagesLinks.push({
                            public_id: blobName,
                            url: blobService.getUrl('imgupload', blobName),
                        });
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.error(`Error uploading image ${i + 1}: ${error.message}`);
        }
    }

    return imagesLinks;
};

module.exports = {
    uploadImagesToAzure,
    deleteImagesFromAzure
};
