from urllib import request

from vk_api import VkUpload, upload
import vk_api
import requests
import random
import secret
from vk_api.bot_longpoll import VkBotLongPoll, VkBotEventType
from vk_api.keyboard import VkKeyboard, VkKeyboardColor

session = requests.Session()
# vk_session = vk_api.VkApi(secret.token)
vk_session = vk_api.VkApi(token="TOKEN")

try:
    # vk_session.auth(token_only=True)
    vk = vk_session.get_api()
    # upload = VkUpload(vk_session)  # Для загрузки изображений
    long_poll = VkBotLongPoll(vk_session, 196522035)
    print("Бот запущен")

    keyboard = VkKeyboard(one_time=True)
    keyboard.add_button("Excellent", color=VkKeyboardColor.POSITIVE)
    keyboard.add_button("Good", color=VkKeyboardColor.DEFAULT)
    keyboard.add_button("Badly", color=VkKeyboardColor.NEGATIVE)
    keyboard.add_line()
    keyboard.add_button("I'm tired", color=VkKeyboardColor.PRIMARY)

    for event in long_poll.listen():
        if event.type == VkBotEventType.MESSAGE_NEW and event.obj['message']['from_id']:
            print(str(event.obj['message']['from_id']) + " " + event.obj['message']['text'])
            vk.messages.send(user_id=event.obj['message']['from_id'], message="Hello!\nHow are you?",
                             random_id=random.randint(1, 10000), keyboard=keyboard.get_keyboard())
        if event.type == VkBotEventType.MESSAGE_ALLOW and event.obj['message']['from_id'] == 'Excellent':
            vk.messages.send(user_id=event.obj['message']['from_id'], message="Wonderful",
                             random_id=random.randint(1, 10000))
    else:
        print(event)

except vk_api.AuthError as error:
    print(error)
