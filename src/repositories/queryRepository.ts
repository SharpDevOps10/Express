const videoQueryRepo = {

  getVideos(): VideoOutputModel[] {
    const videos: DBVideo[] = [];
    const authors: DBAuthor[] = [];

    return videos.map((video) => {
      const author = authors.find((a) => a.id === video.authorId);

      return {
        id: video.id,
        title: video.title,
        author: {
          id: author!.id,
          name: author?.firstName + ' ' + author?.lastName,
        },
      };
    });
  }
};

type DBVideo = {
  id: string,
  title: string,
  authorId: string,
};

type DBAuthor = {
  id: string,
  firstName: string,
  lastName: string,
};

type VideoOutputModel = {
  id: string,
  title: string,
  author: {
    id: string,
    name: string,
  },
};