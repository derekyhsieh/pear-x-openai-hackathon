QUALITY_PROMPT = """
    You are an expert on grading {source} sources based on their quality and significance. 
    Using the provided data below for {source} sources, evaluate and grade its significance. Enter one number on a scale from 0 to 10.

    Title: {title},
    Description: {description},
    Content: {fulltext}

    Consider the following seven factors in your assessment:

    Scale: Assess the number of people affected by the event discussed in the article.
    Magnitude: Evaluate the overall impact or intensity of the event.
    Potential: Determine the likelihood that the event will lead to more significant future events.
    Novelty: Consider how unexpected or unique the event is.
    Immediacy: Analyze how recent or immediate the event is.
    Actionability: Gauge the possibility that a reader can take personal action based on the information in the article.
    Positivity: Evaluate the positive aspects of the event to counteract media negativity bias.
    Credibility: Judge the reliability and trustworthiness of the source of the article.
    
    Provide a detailed rationale for your grading, linking each of the seven factors to specific information in the article where possible. Remember to enter one number on a scale from 0 to 10.

    Consider the following factor in your assessment: {factor}. Rate the quality of this code on a scale of 1 through 10 based on {factor}. Only return a single number, nothing else.
"""

QUALITY_PROMPT_GITHUB = """
    You are an expert on grading {source} sources based on their quality and significance. 
    Using the provided data below for {source} sources, evaluate and grade its significance. Enter one number on a scale from 0 to 10.

    Title: {title},
    Content: {fulltext},

    This repository has {stars} stars and {forks} forks.

    Consider the following factor in your assessment: {factor}. Rate the quality of this code on a scale of 1 through 10 based on {factor}. Only return a single number, nothing else.
"""


SCALE = """
    Assess the number of people affected by the event discussed in the article.
"""

MAGNITUDE = """
    Evaluate the overall impact or intensity of the event.
"""

POTENTIAL = """
    Determine the likelihood that the event will lead to more significant future events.
"""

NOVELTY = """
    Consider how unexpected or unique the event is.
"""

IMMEDIACY = """
    Analyze how recent or immediate the event is.
"""

ACTIONABILITY = """
    Gauge the possibility that a reader can take personal action based on the information in the article.
"""

POSITIVITY = """
    Evaluate the positive aspects of the event to counteract media negativity bias.
"""

CREDIBILITY = """
    Judge the reliability and trustworthiness of the source of the article. 
"""
    

TAG_PROMPT = """
    You are an intelligent tagging model. Your job is to help me tag the following text with specific tags about the content of the text. Given a text, generate a variety of more specific and more generalized tags that are relevant to the main point/theme of the content. For examples, given this content:
            
    Meta is making its Horizon OS – the operating system its Quest headsets run on – available to third-party XR devices (XR is a catchall for virtual, augmented, and mixed reality), and it might be the biggest VR announcement anyone makes this decade.

    The first batch will include headsets from Asus, Lenovo, and Xbox, and while we have an idea what these gadgets might offer, Meta CEO Mark Zuckerberg may have just provided us with a few more details, or outlined other non-Quest hardware we might see running Horizon OS in the future.

    To get you up to speed, the three devices that were teased in the Horizon OS-sharing announcement are a “performance gaming headset” from Asus, “mixed reality devices for productivity” from Lenovo, and a more Quest-like headset from Xbox.

    And in Meta’s Q1 2024 earnings call, Zuckerberg discussed the recent announcement by explaining the sorts of diverse XR hardware we might see by providing some pretty specific examples.

    One was a “work-focused headset” that’s “lighter” and “less designed for motion;” you plug it into a laptop to use it, and this could be something we see from laptop-manufacturer Lenovo’s device. Another Zuckerberg description was for a “gaming-focused headset” that prioritizes “peripherals and haptics,” which could be the Asus headset.

    Then there was a device that would be packaged with “Xbox controllers and a Game Pass subscription out of the box” – with Zuckerberg specifically connecting it to the announced Xbox device.

    tags: ['gaming', 'productivity', 'meta', 'vr', 'xr', 'facebook', 'zuckerberg', 'operating system', 'metaverse', 'meta quest', 'meta horizon', 'hardware']

    Given this content:

    China's first Sora-level text-to-video large model Vidu was unveiled at the 2024 Zhongguancun Forum in Beijing on Saturday, intensifying the artificial intelligence competition globally.

    Vidu, developed by Chinese AI firm Shengshu Technology and Tsinghua University, told China Daily that the model can create a high-definition video 16 seconds long and 1080p resolution in just one click. 

    The company said that it is China's first inaugural video large model with extended duration, exceptional consistency, and dynamic capabilities and is "very close to" the level of Sora.

    Sora is a generative AI model developed by the United States' OpenAI earlier this year. With its ability to build realistic and imaginative scenes from text instructions, the model has taken the tech world by storm.

    Compared with Sora, Vidu is able to understand and generate Chinese elements such as the panda and dragon.

    The company also added that the core architecture of the large model was initiated in September 2022, which was earlier than Sora's adoption of its architecture.

    tags: ['ai/artificial intelligence', 'generative ai', 'open ai', 'sora', 'video generation', 'vidu', 'china', 'china ai', 'text to video']

    Tag the following content:
    
    {text}
    
"""