from langchain_community.llms import HuggingFacePipeline
from langchain_community.embeddings import HuggingFaceEmbeddings
import warnings
warnings.filterwarnings("ignore")

def get_embeddings():

    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name, cache_folder="prediction/media/"
    )
    return embeddings


def get_llm_rag():
    rag_llm = HuggingFacePipeline.from_model_id(
        model_id="google/flan-t5-large",
        task="text2text-generation",
        model_kwargs={
            "temperature": 0,
            "max_length": 1024,
            "cache_dir": "prediction/media/",
        },
        # device=0,
    )
    return rag_llm


