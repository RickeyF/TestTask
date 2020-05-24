import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;
  let authorId: string;
  const testAuthor = {
    firstName: 'Test',
    lastName: 'TestTest',
    birthday: '2020-05-19T18:06:13.193Z',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('Create author - success', () => {
    return request(app.getHttpServer())
      .put('/author')
      .send(testAuthor)
      .expect(({ body }) => {
        authorId = body._id;

        console.log('authorId', authorId);
        expect(body.firstName).toEqual(testAuthor.firstName);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.lastName).toEqual(testAuthor.lastName);
        expect(body.birthday).toEqual(testAuthor.birthday);
        expect(body._id).toBeDefined();
        expect(body.__v).toBeDefined();
      })
      .expect(200);
  });

  it('Create author - validation error', () => {
    const author = {
      firstName: 'Test',
      lastName: '',
      birthday: '2020-05-19T18:06:13.193Z',
    };

    return request(app.getHttpServer())
      .put('/author')
      .send(author)
      .expect(500);
  });

  it('Get all authors - success', () => {
    return request(app.getHttpServer())
      .get('/author')
      .expect(200)
      .expect(({ body }) => {
        const author = body.find(author => author._id === authorId);

        expect(author.firstName).toEqual(testAuthor.firstName);
        expect(author.createdAt).toBeDefined();
        expect(author.updatedAt).toBeDefined();
        expect(author.lastName).toEqual(testAuthor.lastName);
        expect(author.birthday).toEqual(testAuthor.birthday);
        expect(author.__v).toBeDefined();
      });
  });

  it('Get one author - success', () => {
    return request(app.getHttpServer())
      .get(`/author/${authorId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.firstName).toEqual(testAuthor.firstName);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.lastName).toEqual(testAuthor.lastName);
        expect(body.birthday).toEqual(testAuthor.birthday);
        expect(body._id).toEqual(authorId);
        expect(body.__v).toBeDefined();
      });
  });

  it('Get one author - author not found', () => {
    const id = '5ecadba5d2259e24a4dabe99';

    return request(app.getHttpServer())
      .get(`/author/${id}`)
      .expect(404);
  });

  it('Update author - validation error', () => {
    return request(app.getHttpServer())
      .patch(`/author/${authorId}`)
      .send({})
      .expect(400);
  });

  it('Update author - author not found', () => {
    const id = '5ecadba5d2259e24a4dabed9';

    return request(app.getHttpServer())
      .patch(`/author/${id}`)
      .send({ lastName: testAuthor.lastName })
      .expect(404);
  });

  it('Update author - success', () => {
    const author = {
      lastName: 'TestPassed',
    };

    return request(app.getHttpServer())
      .patch(`/author/${authorId}`)
      .send(author)
      .expect(({ body }) => {
        expect(body.firstName).toBeDefined();
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
        expect(body.lastName).toEqual(author.lastName);
        expect(body.birthday).toBeDefined();
        expect(body._id).toEqual(authorId);
        expect(body.__v).toBeDefined();
      })
      .expect(200);
  });

  it('Delete author - success', () => {
    return request(app.getHttpServer())
      .delete(`/author/${authorId}`)
      .expect(200);
  });

  it('Delete author - author not found', () => {
    return request(app.getHttpServer())
      .delete(`/author/${authorId}`)
      .expect(404);
  });
});
