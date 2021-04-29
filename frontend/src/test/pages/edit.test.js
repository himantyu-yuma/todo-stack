import edit from '@/pages/edit.vue';
import date from '@/plugins/filter';
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';

describe('編集ページのテスト', () => {
  let wrapper;

  beforeEach(async () => {
    const localVue = createLocalVue();
    localVue.filter('date', date);
    wrapper = shallowMount(edit, {
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        localVue,
        $config: { backendScheme: 'http', backendHost: 'localhost' },
        $axios: {
          get: () => {
            return new Promise((resolve) => {
              resolve({
                data: [
                  {
                    created_at: '2021-04-24T14:04:24.091000Z',
                    hours: 2,
                    limit: '2021-04-27T03:00',
                    name: 'テスト',
                    priority: '1',
                    score: '-23',
                    updated_at: '2021-04-24T14:04:24.091000Z',
                    _id: 'a'
                  },
                  {
                    created_at: '2021-04-23T14:04:24.091000Z',
                    hours: 2,
                    limit: '2021-04-30T07:00',
                    name: 'テスト2',
                    priority: '2',
                    score: '-50',
                    updated_at: '2021-04-24T14:04:24.091000Z',
                    _id: 'fdsaf'
                  }
                ]
              });
            });
          }
        }
      }
    });
    await flushPromises();
  });

  test('データ取れてるかな？？？？', () => {
    expect(wrapper.vm.todos).toMatchObject([
      {
        created_at: '2021-04-24T14:04:24.091000Z',
        hours: 2,
        limit: '2021-04-27T03:00',
        name: 'テスト',
        priority: '1',
        score: '-23',
        updated_at: '2021-04-24T14:04:24.091000Z',
        _id: 'a'
      },
      {
        created_at: '2021-04-23T14:04:24.091000Z',
        hours: 2,
        limit: '2021-04-30T07:00',
        name: 'テスト2',
        priority: '2',
        score: '-50',
        updated_at: '2021-04-24T14:04:24.091000Z',
        _id: 'fdsaf'
      }
    ]);
  });

  test.each([0, 1])('編集押したときフォームにちゃんと入るかな？', async (index) => {
    await wrapper.find(`tbody tr:nth-child(${index + 1}) button:nth-child(1)`).trigger('click');
    expect(wrapper.find('#name').element.value).toBe(wrapper.vm.todos[index].name);
    expect(wrapper.find('#hours').element.value).toBe(wrapper.vm.todos[index].hours.toString());
    expect(wrapper.find('#limit').element.value).toBe(wrapper.vm.todos[index].limit);
  });
});
