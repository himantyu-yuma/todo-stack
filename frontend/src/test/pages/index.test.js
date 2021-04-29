import index from '@/pages/index.vue';
import date from '@/plugins/filter';
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';

describe('indexページのテスト', () => {
  let wrapper;

  beforeEach(async () => {
    const localVue = createLocalVue();
    localVue.filter('date', date);
    wrapper = shallowMount(index, {
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

  test('データ取ってこれてるかな？？？', () => {
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
      }
    ]);
  });

  test('日付の形式あってるかな？？？？', () => {
    expect(wrapper.find('tbody td:nth-child(3)').text())
      .toMatch(/[0-9]{4}\/[0-9]{2}\/[0-9]{2} [0-9]{2}:[0-9]{2}/);
  });
});
