function worldService($state) {

  return {
    title: () => $state.current.name
  }

}

export default worldService;
