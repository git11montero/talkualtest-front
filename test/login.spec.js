import { mount } from '@vue/test-utils';
import LoginPage from '@/pages/login.vue';

describe('LoginPage', () => {
    test('should display an error message if the login fails', async () => {
        const wrapper = mount(LoginPage);
        wrapper.vm.login = jest.fn().mockReturnValue(false);
        wrapper.setData({ email: 'test@example.com', password: 'password' });
        await wrapper.vm.$nextTick();
        wrapper.find('form').trigger('submit');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.text-red-500').exists()).toBe(true);
        expect(wrapper.find('.text-red-500').text()).toBe('Credenciales incorrectas, por favor, intentalo de nuevo.');
    });


    test('should redirect to the home page if the login succeeds', async () => {
        const wrapper = mount(LoginPage, {
            mocks: {
                $router: {
                    push: jest.fn(),
                },
            },
        });
        wrapper.vm.login = jest.fn().mockReturnValue(true);
        wrapper.setData({ email: 'test@example.com', password: 'password' });
        await wrapper.vm.$nextTick();
        wrapper.find('form').trigger('submit');
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/index');
    });
});
