const videoQueryRepo = {

  getVideos (): VideoOutputModel[] {
    const videos: DBVideo[] = [
      {
        id: '123',
        title: 'Hey Bulldog',
        authorId: '1231',
      },
      {
        id: '1234',
        title: 'Hey Joe',
        authorId: '1233',
      }
    ];
    const authors: DBAuthor[] = [
      {
        id: '1231',
        lastName: 'Paul',
        firstName: 'Mccartney',
      },
      {
        id: '1233',
        lastName: 'John',
        firstName: 'Lennon',
      },
    ];

    return videos.map((video) => {
      const author = authors.find((a) => a.id === video.authorId);

      return this._mapToVideoOutputModel(video, author!);
    });
  },

  getVideoById (): VideoOutputModel {
    const video: DBVideo = {
      id: '1',
      title: 'Hey Jude',
      authorId: '12',
    };

    const author: DBAuthor = {
      id: '12',
      lastName: 'Abdul',
      firstName: 'Muhamed',
    };

    return this._mapToVideoOutputModel(video, author);
  },

  _mapToVideoOutputModel (video: DBVideo, author: DBAuthor): VideoOutputModel {
    return {
      id: video.id,
      title: video.title,
      author: {
        id: author!.id,
        name: author?.firstName + ' ' + author?.lastName,
      },
    };
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