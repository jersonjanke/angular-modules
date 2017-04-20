function helloService($state) {

  return {
    title: () => $state.current.name
  }

}

export default helloService;
